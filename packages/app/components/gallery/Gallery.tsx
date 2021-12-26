import * as React from "react";
import { SectionList, Heading, Center, NativeBaseProvider } from "native-base";
import GalleryRow from "./GalleryRow";
import { ImageData } from "./ImageData";

function calculateRowItems(
  rowWidth: number,
  minRowAspectRatio: number,
  imgs: ImageData[]
): ImageData[][] {
  const rows: ImageData[][] = [];

  let curRow: ImageData[] = [];

  let curHeight = 0;

  for (const img of imgs) {
    if (curHeight !== 0 && curHeight / rowWidth > minRowAspectRatio) {
      // Aspect ratio is lower than
      rows.push(curRow);
      // Reset height
      curHeight = 0;
    }

    curHeight += img.height;
    curRow.push(img);
  }

  return rows;
}

type GroupedImageList = { [key: string]: ImageData[] };

function groupImagesByMonth(imgs: ImageData[]): GroupedImageList {
  // Assuming images are in order
  const imgsByMonth: GroupedImageList = {};

  for (const img of imgs) {
    const sectionTitle = img.created.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (imgsByMonth[sectionTitle] === undefined) {
      imgsByMonth[sectionTitle] = [];
    }

    imgsByMonth[sectionTitle].push(img);
  }

  return imgsByMonth;
}

interface GallerySection {
  title: string;
  data: ImageData[][];
}

interface GalleryProps {
  imageList: ImageData[];
  rowWidth: number;
  minRowAspectRatio: number;
}

export default function Gallery({
  imageList,
  rowWidth,
  minRowAspectRatio,
}: GalleryProps) {
  const groupedImages = groupImagesByMonth(imageList);

  const sections: GallerySection[] = Object.entries(groupedImages).map(
    ([title, imgs]) => {
      const rows = calculateRowItems(rowWidth, minRowAspectRatio, imgs);
      return {
        title,
        data: rows,
      };
    }
  );

  return (
    <SectionList
      px="12"
      mb="4"
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={(data) => <GalleryRow imgs={data.item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Center>
          <Heading fontSize="xl" mt="8" pb="4">
            {title}
          </Heading>
        </Center>
      )}
    />
  );
}
