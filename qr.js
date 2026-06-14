const input = document.querySelector("#urlInput");
const status = document.querySelector("#status");

document.querySelector("#copyUrl").addEventListener("click", async () => {
  const url = input.value.trim();
  if (!url) {
    status.textContent = "公開URLを入力してください。";
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    status.textContent = "URLをコピーしました。";
  } catch (error) {
    status.textContent = "コピーできない場合は、URL欄を選択してコピーしてください。";
  }
});

input.value = `${location.href.replace(/qr\.html.*$/, "")}index.html`;
