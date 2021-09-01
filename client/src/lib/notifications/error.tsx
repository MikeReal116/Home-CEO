import NotificationMsg, {
  Color
} from '../../components/Notification/Notification';

export const errorNotification = (description: string) => {
  return (
    <NotificationMsg
      title='Error'
      description={description}
      severity={Color.error}
    />
  );
};
