export const openModal = (modal: HTMLDialogElement | null) => modal?.showModal();

export const closeModal = (modal: HTMLDialogElement | null) => modal?.close();

export const closeOnOutsideClick = (e: MouseEvent, modal: HTMLDialogElement | null) => {
  if (e.target === modal) closeModal(modal);
};
