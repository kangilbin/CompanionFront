import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Read({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(params.id);
  return "g2";
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query;
  return {
    props: { params },
  };
};
