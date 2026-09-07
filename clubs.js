// ==========================================================================
// YouTube Shorts Blocker - Football Spoiler Club Dictionary
// Covers:
// - Premier League (1部)
// - EFL Championship (プレミア2部)
// - La Liga EA Sports (リーガ1部)
// - La Liga Hypermotion (リーガ2部)
// ==========================================================================

(function (global) {
  const SOCCER_CLUBS = [
    // --- プレミアリーグ 1部 ---
    { name: "Arsenal", keywords: ["アーセナル", "Arsenal"] },
    { name: "Aston Villa", keywords: ["アストン・ヴィラ", "アストンヴィラ", "アストン・ビラ", "アストンビラ", "Aston Villa"] },
    { name: "Bournemouth", keywords: ["ボーンマス", "Bournemouth"] },
    { name: "Brentford", keywords: ["ブレントフォード", "Brentford"] },
    { name: "Brighton", keywords: ["ブライトン", "Brighton"] },
    { name: "Chelsea", keywords: ["チェルシー", "Chelsea"] },
    { name: "Crystal Palace", keywords: ["クリスタル・パレス", "クリスタルパレス", "Crystal Palace"] },
    { name: "Everton", keywords: ["エバートン", "エヴァートン", "Everton"] },
    { name: "Fulham", keywords: ["フラム", "Fulham"] },
    { name: "Ipswich Town", keywords: ["イプスウィッチ", "イプスウィッチ・タウン", "Ipswich Town", "Ipswich"] },
    { name: "Leicester City", keywords: ["レスター", "レスター・シティ", "レスターシティ", "Leicester"] },
    { name: "Liverpool", keywords: ["リヴァプール", "リバプール", "Liverpool"] },
    { name: "Manchester City", keywords: ["マンチェスター・シティ", "マンチェスターシティ", "マンチェスターC", "マンC", "Man City", "Manchester City"] },
    { name: "Manchester United", keywords: ["マンチェスター・ユナイテッド", "マンチェスターユナイテッド", "マンチェスターU", "マンU", "Man Utd", "Man United", "Manchester United"] },
    { name: "Newcastle", keywords: ["ニューカッスル", "ニューカッスル・ユナイテッド", "Newcastle"] },
    { name: "Nottingham Forest", keywords: ["ノッティンガム・フォレスト", "ノッティンガムフォレスト", "ノッティンガム", "Nottingham Forest"] },
    { name: "Southampton", keywords: ["サウサンプトン", "Southampton"] },
    { name: "Tottenham", keywords: ["トッテナム", "トッテナム・ホットスパー", "スパーズ", "Tottenham", "Spurs"] },
    { name: "West Ham", keywords: ["ウェストハム", "ウエストハム", "ウェストハム・ユナイテッド", "West Ham"] },
    { name: "Wolves", keywords: ["ウルヴァーハンプトン", "ウルバーハンプトン", "ウルブス", "ウルヴス", "Wolverhampton", "Wolves"] },

    // --- プレミアリーグ 2部 (EFL Championship) ---
    { name: "Leeds United", keywords: ["リーズ", "リーズ・ユナイテッド", "リーズユナイテッド", "Leeds United", "Leeds"] },
    { name: "Burnley", keywords: ["バーンリー", "Burnley"] },
    { name: "Sheffield United", keywords: ["シェフィールド・ユナイテッド", "シェフィールドユナイテッド", "シェフィールドU", "Sheffield United"] },
    { name: "Luton Town", keywords: ["ルートン", "ルートン・タウン", "ルートンタウン", "Luton Town", "Luton"] },
    { name: "Sunderland", keywords: ["サンダーランド", "Sunderland"] },
    { name: "West Bromwich Albion", keywords: ["ウェスト・ブロムウィッチ", "ウェストブロム", "ウエストブロム", "WBA", "West Brom"] },
    { name: "Middlesbrough", keywords: ["ミドルズブラ", "ミドルスブラ", "Middlesbrough"] },
    { name: "Norwich City", keywords: ["ノーリッジ", "ノリッジ", "ノーリッジ・シティ", "ノリッジ・シティ", "Norwich"] },
    { name: "Coventry City", keywords: ["コヴェントリー", "コベントリー", "Coventry"] },
    { name: "Hull City", keywords: ["ハル・シティ", "ハルシティ", "Hull City"] },
    { name: "Preston North End", keywords: ["プレストン", "プレストン・ノースエンド", "Preston North End"] },
    { name: "Bristol City", keywords: ["ブリストル・シティ", "ブリストルシティ", "Bristol City"] },
    { name: "Cardiff City", keywords: ["カーディフ", "カーディフ・シティ", "Cardiff City", "Cardiff"] },
    { name: "Swansea City", keywords: ["スウォンジー", "スウォンジー・シティ", "Swansea City", "Swansea"] },
    { name: "Watford", keywords: ["ワトフォード", "Watford"] },
    { name: "Queens Park Rangers", keywords: ["クイーンズ・パーク・レンジャーズ", "QPR", "Queens Park Rangers"] },
    { name: "Stoke City", keywords: ["ストーク・シティ", "ストークシティ", "ストーク", "Stoke City"] },
    { name: "Blackburn Rovers", keywords: ["ブラックバーン", "ブラックバーン・ローヴァーズ", "Blackburn"] },
    { name: "Millwall", keywords: ["ミルウォール", "Millwall"] },
    { name: "Sheffield Wednesday", keywords: ["シェフィールド・ウェンズデイ", "シェフィールドウェンズデイ", "Sheffield Wednesday"] },
    { name: "Plymouth Argyle", keywords: ["プリマス", "プリマス・アーガイル", "Plymouth Argyle"] },
    { name: "Portsmouth", keywords: ["ポーツマス", "Portsmouth"] },
    { name: "Derby County", keywords: ["ダービー・カウンティ", "ダービーカウンティ", "Derby County"] },
    { name: "Oxford United", keywords: ["オックスフォード・ユナイテッド", "オックスフォードユナイテッド", "Oxford United"] },

    // --- ラ・リーガ 1部 (La Liga EA Sports) ---
    { name: "Real Madrid", keywords: ["レアル・マドリード", "レアルマドリード", "レアル・マドリー", "レアルマドリー", "レアル", "マドリー", "Real Madrid"] },
    { name: "Barcelona", keywords: ["バルセロナ", "バルサ", "FCバルセロナ", "Barcelona", "Barca", "Barça"] },
    { name: "Atletico Madrid", keywords: ["アトレティコ・マドリード", "アトレティコマドリード", "アトレティコ・マドリー", "アトレティコマドリー", "アトレティコ", "Atletico Madrid", "Atlético Madrid", "Atletico"] },
    { name: "Real Sociedad", keywords: ["レアル・ソシエダ", "レアルソシエダ", "ソシエダ", "Real Sociedad"] },
    { name: "Athletic Bilbao", keywords: ["アスレティック・ビルバオ", "アスレティックビルバオ", "ビルバオ", "Athletic Bilbao", "Athletic Club"] },
    { name: "Villarreal", keywords: ["ビジャレアル", "ヴィジャレアル", "Villarreal"] },
    { name: "Real Betis", keywords: ["レアル・ベティス", "レアルベティス", "ベティス", "Real Betis", "Betis"] },
    { name: "Sevilla", keywords: ["セビージャ", "セビリア", "Sevilla"] },
    { name: "Girona", keywords: ["ジローナ", "Girona"] },
    { name: "Valencia", keywords: ["バレンシア", "Valencia"] },
    { name: "Osasuna", keywords: ["オサスナ", "Osasuna"] },
    { name: "Getafe", keywords: ["ヘタフェ", "Getafe"] },
    { name: "Celta Vigo", keywords: ["セルタ", "セルタ・デ・ビーゴ", "セルタデビーゴ", "Celta Vigo", "Celta"] },
    { name: "Mallorca", keywords: ["マジョルカ", "マヨルカ", "Mallorca"] },
    { name: "Rayo Vallecano", keywords: ["ラージョ・バジェカーノ", "ラージョバジェカーノ", "ラージョ", "Rayo Vallecano"] },
    { name: "Las Palmas", keywords: ["ラス・パルマス", "ラスパルマス", "Las Palmas"] },
    { name: "Alaves", keywords: ["アラベス", "Alaves", "Alavés"] },
    { name: "Leganes", keywords: ["レガネス", "Leganes", "Leganés"] },
    { name: "Real Valladolid", keywords: ["バジャドリード", "バリャドリード", "バジャドリード", "Real Valladolid", "Valladolid"] },
    { name: "Espanyol", keywords: ["エスパニョール", "Espanyol"] },

    // --- ラ・リーガ 2部 (La Liga Hypermotion) ---
    { name: "Cadiz", keywords: ["カディス", "Cadiz", "Cádiz"] },
    { name: "Almeria", keywords: ["アルメリア", "Almeria", "Almería"] },
    { name: "Granada", keywords: ["グラナダ", "Granada"] },
    { name: "Real Oviedo", keywords: ["レアル・オビエド", "レアルオビエド", "オビエド", "Real Oviedo", "Oviedo"] },
    { name: "Sporting Gijon", keywords: ["スポルティング・ヒホン", "スポルティングヒホン", "ヒホン", "Sporting Gijon", "Sporting Gijón"] },
    { name: "Racing Santander", keywords: ["ラシン・サンタンデール", "ラシンサンタンデール", "ラシン", "Racing Santander"] },
    { name: "Levante", keywords: ["レバンテ", "Levante"] },
    { name: "Burgos", keywords: ["ブルゴス", "Burgos"] },
    { name: "Racing Ferrol", keywords: ["ラシン・フェロール", "ラシンフェロール", "Racing Ferrol"] },
    { name: "Elche", keywords: ["エルチェ", "Elche"] },
    { name: "Tenerife", keywords: ["テネリフェ", "Tenerife"] },
    { name: "Albacete", keywords: ["アルバセテ", "Albacete"] },
    { name: "Cartagena", keywords: ["カルタヘナ", "Cartagena"] },
    { name: "Real Zaragoza", keywords: ["レアル・サラゴサ", "レアルサラゴサ", "サラゴサ", "Real Zaragoza", "Zaragoza"] },
    { name: "Eibar", keywords: ["エイバル", "Eibar"] },
    { name: "Huesca", keywords: ["ウエスカ", "Huesca"] },
    { name: "Mirandes", keywords: ["ミランデス", "Mirandes", "Mirandés"] },
    { name: "Cordoba", keywords: ["コルドバ", "Cordoba", "Córdoba"] },
    { name: "Malaga", keywords: ["マラガ", "Malaga", "Málaga"] },
    { name: "Deportivo La Coruna", keywords: ["デポルティーボ・ラ・コルーニャ", "デポルティーボ", "Deportivo La Coruna", "Deportivo"] },
    { name: "Castellon", keywords: ["カステリョン", "Castellon", "Castellón"] },
    { name: "Eldense", keywords: ["エルデンセ", "Eldense"] },

    // --- リーグ名自体のキーワード ---
    { name: "Leagues", keywords: ["プレミアリーグ", "Premier League", "ラ・リーガ", "ラリーガ", "La Liga", "LaLiga", "チャンピオンシップ", "Championship", "リーガ・エスパニョーラ"] }
  ];

  // 全キーワードを抽出し、正規表現エスケープして最長一致順にソート
  const allKeywords = [];
  SOCCER_CLUBS.forEach((item) => {
    item.keywords.forEach((kw) => {
      if (kw && kw.trim()) {
        allKeywords.push(kw.trim());
      }
    });
  });

  // 長いキーワードを優先してマッチさせる
  allKeywords.sort((a, b) => b.length - a.length);

  // 正規表現の特殊文字をエスケープ
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // 1つの高速正規表現パターンを生成
  // 日本語単語、英単語の境界を考慮
  const patternParts = allKeywords.map((kw) => {
    const escaped = escapeRegex(kw);
    // 英字のみの短い略語（例: WBA, QPR, Betis, Wolves 等）は単語境界を付与して誤検知を防ぐ
    if (/^[A-Za-z0-9\s]+$/.test(kw) && kw.length <= 5) {
      return `\\b${escaped}\\b`;
    }
    return escaped;
  });

  const SOCCER_REGEX = new RegExp(`(${patternParts.join("|")})`, "i");

  // 日本語のひらがな・全角英数を正規化（べティス -> ベティス、全角英数 -> 半角など）
  function normalizeText(str) {
    if (!str || typeof str !== "string") return "";
    return str
      // 全角英数を半角に変換
      .replace(/[\uff01-\uff5e]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
      // 全角スペースを半角スペースに
      .replace(/\u3000/g, " ")
      // ひらがなをカタカナに変換（べティス -> ベティス、ばるさ -> バルサ等）
      .replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  }

  // マッチ確認用関数
  function matchSoccerClub(title) {
    if (!title || typeof title !== "string") return null;
    const normalized = normalizeText(title);
    const match = normalized.match(SOCCER_REGEX);
    return match ? match[0] : null;
  }

  // グローバルエクスポート
  global.__SOCCER_SPOILER__ = {
    CLUBS: SOCCER_CLUBS,
    REGEX: SOCCER_REGEX,
    normalizeText: normalizeText,
    matchSoccerClub: matchSoccerClub
  };
})(typeof window !== "undefined" ? window : globalThis);
