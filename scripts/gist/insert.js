const parser = new DOMParser();
const originEmbedScript = parser.parseFromString(document.querySelector("#gist-share-url").value, "text/html").head.firstChild;
const originEmbedSrc = originEmbedScript.getAttribute("src").trim()

Array.from(document.querySelectorAll("span.Button-label")).forEach(el => {
  if (el.textContent === "Raw") {
    const embedButtonText = document.createElement("span");
    embedButtonText.className = "Button-label";
    embedButtonText.textContent = "embed";

    const buttonContext = document.createElement("span");
    buttonContext.className = "Button-context";
    buttonContext.append(embedButtonText);

    const embedButton = document.createElement("div");
    embedButton.className = "Button--secondary Button--small Button--embed Button"
    embedButton.append(buttonContext)

    embedButton.onclick = function (e) {
      const filename = e.target.closest(".file-header").querySelector(".gist-blob-name").textContent.trim()
      const newEmbedSrc = `${originEmbedSrc}?file=${encodeURIComponent(filename)}`
      console.log(newEmbedSrc)

      navigator.clipboard.writeText(`<script src="${newEmbedSrc}"></script>`).then(
        () => {
          tippy(e.target, {
            trigger: 'manual',
            content: "Copied!",
          }).show();
        },
        (e) => {
          console.log(e);
        },
      );
    }

    el.closest("div").prepend(embedButton)
  }
});
