import NotificationMsg, {
  Color
} from '../../components/Notification/Notification';

export const successNotification = (description: string) => {
  return (
    <NotificationMsg
      title='Success'
      description={description}
      severity={Color.success}
    />
  );
};
