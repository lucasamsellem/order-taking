export const closeOnOutsideClick = (e: MouseEvent, modal: HTMLDialogElement | null) => {
  console.log(modal);
  if (!modal || modal.contains(e.target as Node)) return;
  modal.close();
};
