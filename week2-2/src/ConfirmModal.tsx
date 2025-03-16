import { BaseModalProps } from "./types";

export interface ConfirmModalProps extends BaseModalProps {
  type: 'confirm';
  props: {
    title?: string;
    description?: string;
    okText?: string;
    closeText?: string;
    handleClose?: () => void;
    handleOk?: () => void;
  };
}
export const ConfirmModal = ({
  handleClose,
  handleOk,
  title = 'Confirm',
  description = 'Are you sure you want to delete this item?',
  okText = 'Confirm',
  closeText = 'Cancel',
}: ConfirmModalProps['props']
) => {
  return (
  <>
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute z-[-1] inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <br />
        <div>
          <p>{description}</p>
        </div>
        <br />
        <div>
          <button onClick={handleOk}>{okText}</button>
          &nbsp;
          <button onClick={handleClose}>{closeText}</button>
        </div>
        
      </div>
    </div>
  </>
  );
}

export default ConfirmModal