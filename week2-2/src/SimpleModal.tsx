export const SimpleModal = ({
  show,
  showOk = false,
  handleClose,
  handleOk,
  title = 'Alert',
  description = 'This is a simple alert modal',
  okText = 'Confirm',
  closeText = 'Close',
}: {
  show: boolean;
  showOk?: boolean;
  handleClose: () => void;
  handleOk?: () => void;
  title?: string;
  description?: string;
  okText?: string;
  closeText?: string;
}) => {
  return show && (<>
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute z-[-1] inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">{title}</h2>
        <br />
        <p>{description}</p>
        <br />
        {
          showOk && (<>
            <button onClick={handleOk}>{okText}</button>
            &nbsp;
          </>
          )
        }
        <button onClick={handleClose}>{closeText}</button>
      </div>
    </div>
  </>
  );
}

export default SimpleModal