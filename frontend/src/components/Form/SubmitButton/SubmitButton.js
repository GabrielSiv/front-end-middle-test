const buttonStyles = {
  base: 'font-bold py-2 px-4 rounded text-white',
  enabled: 'bg-blue-500 hover:bg-blue-700 cursor-pointer',
  disabled: 'bg-blue-300 cursor-not-allowed opacity-60',
};

function SubmitButton({ text, disabled }) {
  const styles = [
    buttonStyles.base,
    disabled ? buttonStyles.disabled : buttonStyles.enabled,
  ].join(' ');
  return (
    <button type="submit" className={styles}>
      {text}
    </button>
  );
}

export default SubmitButton;
