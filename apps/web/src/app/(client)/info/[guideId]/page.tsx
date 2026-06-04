import { GetContent } from "@/lib/getContent";
import DisplayInfo from "./displayInfo";
import { Container } from "@chakra-ui/react";

type Props = {
  params: Promise<{ guideId: string }>;
};

export default async function PageInfoGuide({ params }: Props) {
  const { guideId } = await params;
  const { meta, contentHTML } = await GetContent({ pathId: guideId });

  return <DisplayInfo contentHTML={contentHTML} meta={meta} />;
}
