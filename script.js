// 샘플 데이터 (실제 언론사/상품이 아닌 데모용)
const pressList = [
  "한빛일보", "새벽뉴스", "경제타임즈", "IT데일리", "스포츠365", "문화신문",
  "국제통신", "생활경제", "테크인사이드", "지역일보", "과학저널", "모닝헤럴드",
  "시사주간", "연예투데이", "금융포커스", "교육신문", "건강뉴스", "여행매거진",
];
const myPress = ["IT데일리", "테크인사이드"];

const topics = [
  { cat: "테크", title: "생성형 AI가 바꾸는 개발자의 하루", color: "#cde8ff" },
  { cat: "여행", title: "가을에 떠나기 좋은 국내 단풍 명소 5곳", color: "#ffe1c4" },
  { cat: "푸드", title: "10분 만에 완성하는 간단 브런치 레시피", color: "#ffd6dc" },
  { cat: "경제", title: "사회초년생을 위한 재테크 기본 가이드", color: "#d7f5df" },
];

const products = [
  { name: "무선 블루투스 이어폰", price: 39900, color: "#e9e4ff" },
  { name: "가을 니트 가디건", price: 29800, color: "#fff1c9" },
  { name: "스테인리스 텀블러", price: 15900, color: "#d8f1f5" },
  { name: "기계식 키보드", price: 89000, color: "#ffe0e0" },
];

// 텍스트를 안전하게 넣기 위해 innerHTML 대신 DOM API 사용
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderPress(type) {
  const grid = document.getElementById("pressGrid");
  grid.replaceChildren();
  const list = type === "my" ? myPress : pressList;
  if (list.length === 0) {
    grid.append(el("li", "empty", "구독한 언론사가 없습니다."));
    return;
  }
  list.forEach((name) => {
    const li = el("li");
    const a = el("a", "", name);
    a.href = "#";
    li.append(a);
    grid.append(li);
  });
}

function renderTopics() {
  const ul = document.getElementById("topicList");
  topics.forEach((t) => {
    const li = el("li");
    const a = el("a");
    a.href = "#";
    const thumb = el("div", "thumb");
    thumb.style.background = t.color;
    a.append(thumb, el("span", "cat", t.cat), el("p", "title", t.title));
    li.append(a);
    ul.append(li);
  });
}

function renderShop() {
  const ul = document.getElementById("shopList");
  products.forEach((p) => {
    const li = el("li");
    const a = el("a");
    a.href = "#";
    const thumb = el("div", "thumb");
    thumb.style.background = p.color;
    a.append(
      thumb,
      el("p", "name", p.name),
      el("p", "price", p.price.toLocaleString("ko-KR") + "원")
    );
    li.append(a);
    ul.append(li);
  });
}

// 뉴스스탠드 탭 전환
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderPress(tab.dataset.tab);
  });
});

// 검색: 입력값을 인코딩해서 네이버 검색으로 이동
function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById("query").value.trim();
  if (!q) return false;
  window.location.href = "https://search.naver.com/search.naver?query=" + encodeURIComponent(q);
  return false;
}

renderPress("all");
renderTopics();
renderShop();
