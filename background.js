// YouTube Shorts Blocker & Football Spoiler Mask - Background Service Worker (Manifest V3)

const MENU_HIDE_SHORTS = "toggle_hide_shorts";
const MENU_MASK_SOCCER = "toggle_mask_soccer";

// 設定状態を取得（旧バージョンの enabled も引き継ぎ）
async function getSettings() {
  const data = await chrome.storage.sync.get({
    hideShorts: true,
    maskSoccer: true,
    enabled: true
  });
  return {
    hideShorts: data.hideShorts !== undefined ? data.hideShorts : data.enabled,
    maskSoccer: data.maskSoccer !== undefined ? data.maskSoccer : true
  };
}

// ツールバーのバッジ表示を更新
function updateBadge(settings) {
  const anyEnabled = settings.hideShorts || settings.maskSoccer;
  const text = anyEnabled ? "ON" : "OFF";
  const color = anyEnabled ? "#00B050" : "#777777";
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color });
}

// 右クリックメニューの登録
function setupContextMenu(settings) {
  chrome.contextMenus.removeAll(() => {
    // 1. ショート・ゲームルーム非表示
    chrome.contextMenus.create({
      id: MENU_HIDE_SHORTS,
      title: settings.hideShorts
        ? "✓ ショート・ゲームルーム非表示: ON"
        : "ショート・ゲームルーム非表示: OFF",
      type: "checkbox",
      checked: settings.hideShorts,
      contexts: ["action", "page"],
      documentUrlPatterns: ["*://*.youtube.com/*"]
    });

    // 2. サッカーネタバレ防止マスク
    chrome.contextMenus.create({
      id: MENU_MASK_SOCCER,
      title: settings.maskSoccer
        ? "✓ サッカーネタバレ防止マスク: ON"
        : "サッカーネタバレ防止マスク: OFF",
      type: "checkbox",
      checked: settings.maskSoccer,
      contexts: ["action", "page"],
      documentUrlPatterns: ["*://*.youtube.com/*"]
    });
  });
}

// 全YouTubeタブへ状態変更をブロードキャスト
async function notifyYouTubeTabs(message) {
  try {
    const tabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message).catch(() => {
          // コンテンツスクリプト未注入のタブは無視
        });
      }
    }
  } catch (err) {
    console.error("Failed to notify tabs:", err);
  }
}

// ショート動画非表示のトグル
async function toggleHideShorts() {
  const settings = await getSettings();
  const newState = !settings.hideShorts;
  await chrome.storage.sync.set({ hideShorts: newState, enabled: newState });
  settings.hideShorts = newState;

  updateBadge(settings);
  chrome.contextMenus.update(MENU_HIDE_SHORTS, {
    checked: newState,
    title: newState
      ? "✓ ショート・ゲームルーム非表示: ON"
      : "ショート・ゲームルーム非表示: OFF"
  });

  await notifyYouTubeTabs({
    action: "SET_ENABLED",
    enabled: newState
  });
}

// サッカーネタバレ防止マスクのトグル
async function toggleMaskSoccer() {
  const settings = await getSettings();
  const newState = !settings.maskSoccer;
  await chrome.storage.sync.set({ maskSoccer: newState });
  settings.maskSoccer = newState;

  updateBadge(settings);
  chrome.contextMenus.update(MENU_MASK_SOCCER, {
    checked: newState,
    title: newState
      ? "✓ サッカーネタバレ防止マスク: ON"
      : "サッカーネタバレ防止マスク: OFF"
  });

  await notifyYouTubeTabs({
    action: "SET_SOCCER_MASK",
    enabled: newState
  });
}

// 拡張機能インストール・更新時の初期設定
chrome.runtime.onInstalled.addListener(async () => {
  const settings = await getSettings();
  updateBadge(settings);
  setupContextMenu(settings);
});

// ブラウザ起動時の初期化
chrome.runtime.onStartup.addListener(async () => {
  const settings = await getSettings();
  updateBadge(settings);
  setupContextMenu(settings);
});

// 右クリックメニューのクリック処理
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MENU_HIDE_SHORTS) {
    toggleHideShorts();
  } else if (info.menuItemId === MENU_MASK_SOCCER) {
    toggleMaskSoccer();
  }
});

// 拡張機能アイコン通常クリック時（両方ONならOFF、それ以外なら両方ON）
chrome.action.onClicked.addListener(async () => {
  const settings = await getSettings();
  const targetState = !(settings.hideShorts && settings.maskSoccer);

  await chrome.storage.sync.set({
    hideShorts: targetState,
    maskSoccer: targetState,
    enabled: targetState
  });

  const newSettings = { hideShorts: targetState, maskSoccer: targetState };
  updateBadge(newSettings);
  setupContextMenu(newSettings);

  await notifyYouTubeTabs({
    action: "SET_ALL",
    hideShorts: targetState,
    maskSoccer: targetState
  });
});

// コンテンツスクリプトからの状態問い合わせ
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GET_STATUS") {
    getSettings().then((settings) => {
      sendResponse(settings);
    });
    return true;
  }
});
