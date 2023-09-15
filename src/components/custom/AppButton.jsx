function AppButon({ fileIcon, label, submit }) {
  return (
    <Button
      onClick={() => submit()}
      className={styles.appPrimaryButton}
      style={{ background: 'white' }}
    >
      <div className={styles.customButtonWrapper}>
        {fileIcon ? (
          <div className="iconWrapper">
            <img src={fileIcon} />
          </div>
        ) : (
          <></>
        )}
        <label>{label}</label>
      </div>
    </Button>
  );
}
export default AppButon;
