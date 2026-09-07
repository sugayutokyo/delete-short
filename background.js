// YouTube Shorts Blocker - Background Service Worker (Manifest V3)

const CONTEXT_MENU_ID = "toggle_hide_shorts";

// 現在の設定状態を取得・初期化
async function getEnabledState() {
  const data = await chrome.storage.sync.get({ enabled: true });
  return data.enabled;
}

// アイコンのバッジ表示を更新
function updateBadge(enabled) {
  const text = enabled ? "ON" : "OFF";
  const color = enabled ? "#00B050" : "#777777";
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color });
}

// 右クリックメニューの登録・更新
function setupContextMenu(enabled) {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title: enabled
        ? "✓ ショート動画非表示: ON (クリックでOFF)"
        : "ショート動画非表示: OFF (クリックでON)",
      type: "checkbox",
      checked: enabled,
      contexts: ["action", "page"],
      documentUrlPatterns: ["*://*.youtube.com/*"]
    });
  });
}

// 全YouTubeタブへ状態変更をブロードキャスト
async function notifyYouTubeTabs(enabled) {
  try {
    const tabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: "SET_ENABLED",
          enabled: enabled
        }).catch(() => {
          // コンテンツスクリプト未注入のタブは無視
        });
      }
    }
  } catch (err) {
    console.error("Failed to notify tabs:", err);
  }
}

// 状態のトグル処理
async function toggleState() {
  const current = await getEnabledState();
  const newState = !current;

  await chrome.storage.sync.set({ enabled: newState });
  updateBadge(newState);

  // コンテキストメニューの状態を更新
  chrome.contextMenus.update(CONTEXT_MENU_ID, {
    checked: newState,
    title: newState
      ? "✓ ショート動画非表示: ON (クリックでOFF)"
      : "ショート動画非表示: OFF (クリックでON)"
  });

  await notifyYouTubeTabs(newState);
  return newState;
}

// 拡張機能インストール・更新時の初期設定
chrome.runtime.onInstalled.addListener(async () => {
  const enabled = await getEnabledState();
  updateBadge(enabled);
  setupContextMenu(enabled);
});

// ブラウザ起動時の初期化
chrome.runtime.onStartup.addListener(async () => {
  const enabled = await getEnabledState();
  updateBadge(enabled);
  setupContextMenu(enabled);
});

// 右クリックのコンテキストメニューがクリックされたとき
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    toggleState();
  }
});

// 拡張機能アイコンの左クリック時もトグル可能に
chrome.action.onClicked.addListener(() => {
  toggleState();
});

// コンテンツスクリプトからの問い合わせに対応
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GET_STATUS") {
    getEnabledState().then((enabled) => {
      sendResponse({ enabled });
    });
    return true; // 非同期レスポンス
  }
});
