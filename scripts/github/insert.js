const currentURL = `${location.protocol}//${location.host}${location.pathname}`;

Array.from(document.querySelectorAll("span[data-component='text']")).forEach(el => {
  if (el.textContent === "Raw") {
    const buttonGroupOfRawButton = el.closest("div");
    const rawButton = el.closest("a");
    const rawButtonContent = el.parentNode;

    const buttonGroupOfEmbedButton = document.createElement("div");
    buttonGroupOfEmbedButton.className = buttonGroupOfRawButton.className;

    const embedButton = document.createElement("div");
    embedButton.className = rawButton.className;
    embedButton.setAttribute("data-size", "small");

    const embedButtonContent = rawButtonContent.cloneNode(true);
    console.log(embedButtonContent)
    console.log(embedButtonContent.firstChild)
    embedButtonContent.firstChild.textContent = "Embed";

    embedButton.appendChild(embedButtonContent);
    buttonGroupOfEmbedButton.appendChild(embedButton);

    embedButton.onclick = function (e) {
      navigator.clipboard.writeText(`<script src="https://emgithub.com/embed-v2.js?target=${encodeURIComponent(currentURL)}&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>`).then(
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

    buttonGroupOfRawButton.parentNode.prepend(buttonGroupOfEmbedButton);
  }
});
