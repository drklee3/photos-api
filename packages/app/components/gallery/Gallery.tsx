import * as React from "react";
import { SectionList, Heading, Center, NativeBaseProvider } from "native-base";
import { useWindowDimensions } from "react-native";
import GalleryRow from "./GalleryRow";
import { ImageData, ImageRow } from "./ImageData";
import { useMeasure } from "react-use";

function calculateRowItems(
  rowWidth: number,
  minRowAspectRatio: number,
  imgs: ImageData[]
): ImageRow[] {
  const rows: ImageRow[] = [];
  let curRow: ImageData[] = [];

  let curHeight = 0;

  for (const img of imgs) {
    if (curHeight !== 0 && curHeight / rowWidth > minRowAspectRatio) {
      // Aspect ratio is lower than min
      rows.push({
        images: curRow,
        aspectRatio: curHeight / rowWidth,
      });
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
  data: ImageRow[];
}

interface GalleryProps {
  imageList: ImageData[];
  minRowAspectRatio: number;
}

export default function Gallery({
  imageList,
  minRowAspectRatio,
}: GalleryProps) {
  const windowWidth = useWindowDimensions().width - 240;

  const groupedImages = groupImagesByMonth(imageList);

  const sections: GallerySection[] = Object.entries(groupedImages).map(
    ([title, imgs]) => {
      const rows = calculateRowItems(windowWidth, minRowAspectRatio, imgs);
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
      renderItem={(data) => <GalleryRow row={data.item} width={windowWidth} />}
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
