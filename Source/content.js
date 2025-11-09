(async () => {
  const spans = document.querySelectorAll("div[style*='padding: 0px 1in'] > span:first-child");

  const items = [...spans].map(span => {
    const html = span.innerHTML;
    const titleMatch = html.match(/<i>(.*?)<\/i>/);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const urlMatch = span.innerText.match(/https?:\/\/\S+/);
    const url = urlMatch ? urlMatch[0] : null;
    return title && url ? { title, url } : null;
  }).filter(x => x);

  if (!items.length) {
    chrome.runtime.sendMessage("ERROR");
    alert("No citations found.");
    return;
  }

  const htmlLinks = items.map(i => `<a href="${i.url}">${i.title}</a>`).join("<br>");
  const plainText = items.map(i => `${i.title} - ${i.url}`).join("\n");

  const data = [
    new ClipboardItem({
      "text/html": new Blob([htmlLinks], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" })
    })
  ];

  await navigator.clipboard.write(data);
  chrome.runtime.sendMessage("FINISHED");
})();
