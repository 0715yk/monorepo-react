interface Props {
  params: { id: string };
}
const ContentPage = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default ContentPage;
