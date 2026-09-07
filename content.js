// YouTube Shorts Blocker & Football Spoiler Mask - Content Script

let isHideShortsEnabled = true;
let isMaskSoccerEnabled = true;
let scanTimeout = null;

// 1. ページロード直後に初期化（チラツキ防止）
document.documentElement.setAttribute("data-hide-shorts", "true");

// ストレージから最新設定を取得
chrome.storage.sync.get({ hideShorts: true, maskSoccer: true, enabled: true }, (data) => {
  isHideShortsEnabled = data.hideShorts !== undefined ? data.hideShorts : data.enabled !== false;
  isMaskSoccerEnabled = data.maskSoccer !== undefined ? data.maskSoccer : true;

  applyHideShorts(isHideShortsEnabled);
  if (isMaskSoccerEnabled) {
    scheduleSoccerScan();
  }
});

// 2. ショート・ゲームルーム非表示の適用
function applyHideShorts(enabled) {
  isHideShortsEnabled = enabled;
  document.documentElement.setAttribute("data-hide-shorts", enabled ? "true" : "false");
  if (enabled) {
    checkAndRedirectShortsUrl();
  }
}

// 3. /shorts/ または /playables のアクセス時に自動リダイレクト
function checkAndRedirectShortsUrl() {
  if (!isHideShortsEnabled) return;
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

// ==========================================================================
// 4. サッカーネタバレ防止マスク (Football Spoiler Mask)
// ==========================================================================

const VIDEO_SELECTORS = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
  "ytd-compact-video-renderer",
  "yt-lockup-view-model"
];

function getVideoTitle(card) {
  const titleEl = card.querySelector(
    "#video-title, yt-formatted-string#video-title, h3 a, a#video-title-link, .yt-lockup-metadata-view-model-wiz__title"
  );
  if (!titleEl) return "";
  return (
    titleEl.textContent?.trim() ||
    titleEl.getAttribute("title")?.trim() ||
    titleEl.getAttribute("aria-label")?.trim() ||
    ""
  );
}

function maskVideoCard(card, matchedClub) {
  if (card.classList.contains("soccer-spoiler-masked") || card.classList.contains("soccer-spoiler-revealed")) {
    return;
  }

  card.classList.add("soccer-spoiler-masked");

  // マスクの挿入先ターゲット
  const targetContainer = card.querySelector("#dismissible") || card;
  if (targetContainer !== card) {
    targetContainer.style.position = "relative";
  }

  // 既存のオーバーレイがないか確認
  if (card.querySelector(".soccer-spoiler-overlay")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "soccer-spoiler-overlay";
  overlay.innerHTML = `
    <div class="soccer-spoiler-icon">⚽</div>
    <div class="soccer-spoiler-title">サッカーネタバレ防止マスク</div>
    <div class="soccer-spoiler-club-badge">${escapeHtml(matchedClub)}</div>
    <div class="soccer-spoiler-hint">クリックしてマスクを剥がす</div>
  `;

  // クリックでマスクを剥がす（リンク先への誤遷移を完全に防止）
  overlay.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      overlay.classList.add("soccer-spoiler-peeling");
      setTimeout(() => {
        card.classList.add("soccer-spoiler-revealed");
        overlay.remove();
      }, 200);
    },
    true
  );

  // ポインターイベントの親要素への透過を防止
  const blockPropagation = (e) => {
    e.stopPropagation();
  };
  overlay.addEventListener("mousedown", blockPropagation, true);
  overlay.addEventListener("mouseup", blockPropagation, true);
  overlay.addEventListener("pointerdown", blockPropagation, true);
  overlay.addEventListener("pointerup", blockPropagation, true);

  targetContainer.appendChild(overlay);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scanAndMaskSoccerVideos() {
  if (!isMaskSoccerEnabled) return;
  if (!window.__SOCCER_SPOILER__ || !window.__SOCCER_SPOILER__.matchSoccerClub) return;

  const selector = VIDEO_SELECTORS.join(", ");
  const cards = document.querySelectorAll(selector);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card.classList.contains("soccer-spoiler-masked") || card.classList.contains("soccer-spoiler-revealed")) {
      continue;
    }

    const title = getVideoTitle(card);
    if (!title) continue;

    const matchedClub = window.__SOCCER_SPOILER__.matchSoccerClub(title);
    if (matchedClub) {
      maskVideoCard(card, matchedClub);
    }
  }
}

function removeAllSoccerMasks() {
  document.querySelectorAll(".soccer-spoiler-overlay").forEach((el) => el.remove());
  document.querySelectorAll(".soccer-spoiler-masked").forEach((el) => {
    el.classList.remove("soccer-spoiler-masked");
    el.classList.remove("soccer-spoiler-revealed");
  });
}

function scheduleSoccerScan() {
  if (!isMaskSoccerEnabled) return;
  if (scanTimeout) clearTimeout(scanTimeout);
  scanTimeout = setTimeout(() => {
    scanAndMaskSoccerVideos();
  }, 120);
}

// 5. 動的ローディング（スクロール）の監視
const observer = new MutationObserver((mutations) => {
  if (!isMaskSoccerEnabled) return;
  for (const m of mutations) {
    if (m.addedNodes.length > 0) {
      scheduleSoccerScan();
      break;
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// 6. YouTubeのSPA画面遷移イベントを監視
window.addEventListener("yt-navigate-finish", () => {
  checkAndRedirectShortsUrl();
  scheduleSoccerScan();
});
window.addEventListener("popstate", () => {
  checkAndRedirectShortsUrl();
  scheduleSoccerScan();
});

// 7. バックグラウンドからの設定変更メッセージを受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SET_ENABLED") {
    applyHideShorts(message.enabled);
    sendResponse({ success: true, hideShorts: message.enabled });
  } else if (message.action === "SET_SOCCER_MASK") {
    isMaskSoccerEnabled = message.enabled;
    if (isMaskSoccerEnabled) {
      scheduleSoccerScan();
    } else {
      removeAllSoccerMasks();
    }
    sendResponse({ success: true, maskSoccer: message.enabled });
  } else if (message.action === "SET_ALL") {
    applyHideShorts(message.hideShorts);
    isMaskSoccerEnabled = message.maskSoccer;
    if (isMaskSoccerEnabled) {
      scheduleSoccerScan();
    } else {
      removeAllSoccerMasks();
    }
    sendResponse({ success: true });
  }
});

// 初期ロード時の実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    checkAndRedirectShortsUrl();
    scheduleSoccerScan();
  });
} else {
  checkAndRedirectShortsUrl();
  scheduleSoccerScan();
}
