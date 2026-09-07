// YouTube Shorts Blocker - Content Script

let isEnabled = true;

// 1. ページロード直後に初期化（チラツキ防止のためデフォルトで非表示を適用）
document.documentElement.setAttribute("data-hide-shorts", "true");

// ストレージから最新の状態を取得
chrome.storage.sync.get({ enabled: true }, (data) => {
  isEnabled = data.enabled !== false;
  applyState(isEnabled);
});

// 2. 状態の適用（属性切り替えとURLチェック）
function applyState(enabled) {
  isEnabled = enabled;
  document.documentElement.setAttribute("data-hide-shorts", enabled ? "true" : "false");
  if (enabled) {
    checkAndRedirectShortsUrl();
  }
}

// 3. /shorts/ または /playables のアクセス時に自動リダイレクト
function checkAndRedirectShortsUrl() {
  if (!isEnabled) return;
  const currentPath = window.location.pathname;
  if (currentPath.startsWith("/shorts/")) {
    const videoId = currentPath.split("/shorts/")[1]?.split(/[?&#]/)[0];
    if (videoId) {
      const searchParams = window.location.search ? window.location.search.replace(/^\?/, "&") : "";
      const newUrl = `/watch?v=${videoId}${searchParams}`;
      window.location.replace(newUrl);
    }
  } else if (currentPath.startsWith("/playables")) {
    window.location.replace("/");
  }
}

// 4. YouTubeのSPA画面遷移イベントを監視
window.addEventListener("yt-navigate-finish", () => {
  checkAndRedirectShortsUrl();
});
window.addEventListener("popstate", () => {
  checkAndRedirectShortsUrl();
});

// 5. バックグラウンドからの状態変更メッセージを受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SET_ENABLED") {
    applyState(message.enabled);
    sendResponse({ success: true, enabled: message.enabled });
  }
});

// 6. 念のためのフォールバック（動的読み込み時のリンク監視等）
function inspectAndCleanShorts() {
  if (!isEnabled) return;
  checkAndRedirectShortsUrl();
}

// 初回チェック
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inspectAndCleanShorts);
} else {
  inspectAndCleanShorts();
}
