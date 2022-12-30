export function getText(
  element: DocumentFragment | HTMLElement,
  selector: string
) {
  return element.querySelector(selector)!.textContent;
}

export function setText(
  element: DocumentFragment | HTMLElement,
  selector: string,
  text: string
) {
  element.querySelector(selector)!.textContent = text.toString();
  return element;
}

export function showMessage(text = "", title = "Info", append = false) {
  const element = document.getElementById("message-box") as any;

  // post non-null assertion operator
  element!.style.visibility = !!text ? "visible" : "hidden";

  let newText = text;
  if (append) {
    let oldText = getText(element, ".message-body");
    newText = `${oldText}\r\n${text}`;
  }

  setText(element, ".message-body", title);
  setText(element, ".message-body", newText);
}
