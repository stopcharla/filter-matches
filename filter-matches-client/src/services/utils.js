
import { notification } from 'antd';

export const openNotificationWithIcon = (nObj) => {
  console.log("inside openNotificationWithIcon", nObj);
  notification[nObj.severity]({
    key: Date.now(),
    message: nObj.title,
    description: nObj.message,
    duration: 10,
    placement: "bottomRight",
  });
};
