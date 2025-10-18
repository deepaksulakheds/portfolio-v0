import { Navigate } from "react-router-dom";
import { useSecretContext } from "./Hooks/SecretContext";
import { useAttachmentToggle } from "./Pages/Header/MailDialog/attachmentContext";

const ProtectedRoute = ({
  element,
  fallback = <Navigate to="/" replace={true} />,
}) => {
  const { secretEnabled } = useSecretContext();
  const { isAttachmentEnabled } = useAttachmentToggle();

  if (!secretEnabled || !isAttachmentEnabled) {
    return fallback;
  }
  return element;
};

export default ProtectedRoute;
