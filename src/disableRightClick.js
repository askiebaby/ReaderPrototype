function iEsc() {
  return false;
}
function iRec() {
  return true;
}
function DisableKeys() {
  if (event.ctrlKey || event.shiftKey || event.altKey) {
    window.event.returnValue = false;
    iEsc();
  }
}
document.ondragstart = iEsc;
document.onkeydown = DisableKeys;
document.oncontextmenu = iEsc;
if (typeof document.onselectstart != 'undefined') document.onselectstart = iEsc;
else {
  document.onmousedown = iEsc;
  document.onmouseup = iRec;
}
function DisableRightClick(qsyzDOTnet) {
  if (window.Event) {
    if (qsyzDOTnet.which == 2 || qsyzDOTnet.which == 3) iEsc();
  } else if (event.button == 2 || event.button == 3) {
    event.cancelBubble = true;
    event.returnValue = false;
    iEsc();
  }
}
