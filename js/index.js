const ROOT_ELEMENT = document.getElementById("root");
const LOAD_BTN = document.querySelector(".custom-btn");
let COUNT = 20;

let loadingFlag = true;
let LoadingIndicator = document.createElement("div");
LoadingIndicator.setAttribute("class", "loading");

function isLoading(flag, loadText = "Loading...") {
  LoadingIndicator.innerText = loadText;
  if (flag) {
    ROOT_ELEMENT.appendChild(LoadingIndicator);
    LOAD_BTN.style.display = "none";
  } else {
    document.querySelector(".loading").remove();
    LOAD_BTN.style.display = "initial";
  }
  loadingFlag = flag;
}

function generateCard(data) {
  return `<div class="card">
      <div class="card-img">
        <img
          src="${data.imageUrl}"
          class="card-news-img"
        />
      </div>
      <div class="card-data">
        <div class="card-data-title mb-4">
          <a href="${data.url}" target="_blank" class="news-provider-url">
            ${data.title}
          </a>
        </div>
        <div class="card-data-summary mb-4">
          ${data.summary.slice(0, 250) + "..."}
        </div>
        <div class="news-provider-data">
          <div class="news-provider">
            <a href="${data.url}" target="_blank" class="news-provider-url">${
    data.newsSite
  }</a>
          </div>
          <div class="updated-time">${data.updatedAt.slice(
            data.updatedAt.indexOf("T") + 1,
            data.updatedAt.indexOf("T") + 6
          )}</div>
        </div>
      </div>
    </div>`;
}

function setData(data) {
  for (let i = COUNT - 20; i < data.length; i++) {
    ROOT_ELEMENT.innerHTML = ROOT_ELEMENT.innerHTML + generateCard(data[i]);
  }
  isLoading(false);
}

function getData() {
  isLoading(true);
  fetch(`https://spaceflightnewsapi.net/api/v2/articles?_limit=${COUNT}`)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        isLoading(false, "404 - Server Error!");
      }
    })
    .then((data) => setData(data));
}
getData();
LOAD_BTN.addEventListener("click", () => {
  COUNT += 20;
  getData();
});
