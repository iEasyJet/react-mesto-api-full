import PopupWithForm from "./PopupWithForm";

function DeletionConfirmationPopup({
  isOpen,
  onClose,
  closeOnOverlay,
  onSubmit,
  changeButtonName,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      buttonText={changeButtonName ? "Удаление..." : "Да"}
      modifier="delete_card"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlay={closeOnOverlay}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletionConfirmationPopup;
