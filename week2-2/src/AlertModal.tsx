import { BaseModalProps } from "./types";

export interface AlertModalProps extends BaseModalProps {
  type: 'alert';
  props: {
    title?: string;
    description?: string;
    closeText?: string;
    handleClose?: () => void;
  };
}

export const AlertModal = ({
  handleClose,
  title = 'Alert',
  description = 'This is a simple alert modal',
  closeText = 'Close',
}: AlertModalProps['props']) => (
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
        <button onClick={handleClose}>{closeText}</button>
      </div>
      
    </div>
  </div>
)

export default AlertModal