import {
  FilterOperator,
  FreelancerImage,
  NearbyFreelancerDetail,
} from "@/types";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  Modal,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { useGetFreelancerGallery } from "@/mutations";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - 32 - 4) / 3;

interface Props {
  freelancer: NearbyFreelancerDetail;
}

export default function ImageGallery({ freelancer }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetFreelancerGallery({
      filters: [
        {
          field: "freelancerId",
          value: freelancer.freelancer_id,
          operator: FilterOperator.EQUAL_TO,
        },
      ],
    });

  const images: FreelancerImage[] = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const totalItems = data?.pages[0]?.meta.totalItems ?? 0;
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  // Group images into rows of 3 for FlatList
  const rows = useMemo(() => {
    const result: FreelancerImage[][] = [];
    for (let i = 0; i < images.length; i += 3) {
      result.push(images.slice(i, i + 3));
    }
    return result;
  }, [images]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator />
      </View>
    );
  }

  if (!isLoading && images.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-4xl mb-3">🖼️</Text>
        <Text className="text-base font-semibold text-primary-700 dark:text-primary-300">
          No photos yet
        </Text>
        <Text className="text-sm text-primary-400 dark:text-primary-500 mt-1 text-center px-8">
          This freelancer hasn't added any photos yet.
        </Text>
      </View>
    );
  }

  return (
    <View className="mt-2 mb-6">
      {/* Header */}
      <Animated.Text
        entering={FadeInDown.delay(50).duration(400)}
        className="text-sm text-primary-500 dark:text-primary-400 mb-3"
      >
        {totalItems} photos{"  •  "}Previous work showcase
      </Animated.Text>

      <FlatList
        data={rows}
        keyExtractor={(_, rowIndex) => `row-${rowIndex}`}
        scrollEnabled={false} // parent ScrollView handles scrolling
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={2}
        renderItem={({ item: row, index: rowIndex }) => (
          <View
            className="flex-row gap-1 mb-1"
          >
            {row.map((img, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              const isFirstRow = rowIndex === 0;
              const isLastRow = rowIndex === rows.length - 1 && !hasNextPage;

              return (
                <Animated.View
                  key={img.image_id}
                  entering={ZoomIn.delay(index * 150).duration(300)}
                >
                  <Pressable
                    onPress={() => setSelectedIndex(index)}
                    style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                    className={clsx("overflow-hidden", {
                      "rounded-tl-2xl": isFirstRow && colIndex === 0,
                      "rounded-tr-2xl": isFirstRow && colIndex === 2,
                      "rounded-bl-2xl": isLastRow && colIndex === 0,
                      "rounded-br-2xl":
                        isLastRow && colIndex === row.length - 1,
                    })}
                  >
                    <Image
                      source={{ uri: img.image_url }}
                      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                      resizeMode="cover"
                    />
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        )}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4 items-center">
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />

      {/* Lightbox Modal */}
      <Modal
        visible={selectedIndex !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setSelectedIndex(null)}
      >
        <StatusBar
          backgroundColor="rgba(0,0,0,0.95)"
          barStyle="light-content"
        />
        <View className="flex-1 bg-black/95 items-center justify-center">
          {/* Close button */}
          <Animated.View
            entering={FadeIn.delay(150).duration(300)}
            className="absolute top-12 right-4 z-10"
          >
            <Pressable
              onPress={() => setSelectedIndex(null)}
              className="bg-white/10 rounded-full p-2"
            >
              <Ionicons name="close" size={24} color="white" />
            </Pressable>
          </Animated.View>

          {/* Counter */}
          {selectedIndex !== null && (
            <Animated.Text
              entering={FadeIn.delay(100).duration(300)}
              className="absolute top-14 left-0 right-0 text-center text-white/60 text-sm"
            >
              {selectedIndex + 1} / {totalItems}
            </Animated.Text>
          )}

          {/* Image */}
          {selectedImage && (
            <Animated.View entering={ZoomIn.duration(350)}>
              <Image
                source={{ uri: selectedImage.image_url }}
                style={{ width: width, height: width }}
                resizeMode="contain"
                accessibilityLabel={selectedImage.alt_text}
              />
            </Animated.View>
          )}

          {/* Label */}
          {selectedImage && (
            <Animated.Text
              entering={FadeInDown.delay(200).duration(350)}
              className="text-white/80 text-sm mt-4 px-6 text-center"
            >
              {selectedImage.alt_text}
            </Animated.Text>
          )}

          {/* Prev / Next */}
          <Animated.View
            entering={FadeInDown.delay(250).duration(350)}
            className="flex-row gap-6 mt-8"
          >
            <Pressable
              onPress={() =>
                setSelectedIndex((i) =>
                  i !== null ? Math.max(0, i - 1) : null,
                )
              }
              disabled={selectedIndex === 0}
              className={clsx("bg-white/10 rounded-full p-3", {
                "opacity-30": selectedIndex === 0,
              })}
            >
              <Ionicons name="chevron-back" size={22} color="white" />
            </Pressable>
            <Pressable
              onPress={() => {
                if (
                  selectedIndex !== null &&
                  selectedIndex === images.length - 1 &&
                  hasNextPage
                ) {
                  fetchNextPage();
                }
                setSelectedIndex((i) =>
                  i !== null ? Math.min(images.length - 1, i + 1) : null,
                );
              }}
              disabled={selectedIndex === images.length - 1 && !hasNextPage}
              className={clsx("bg-white/10 rounded-full p-3", {
                "opacity-30":
                  selectedIndex === images.length - 1 && !hasNextPage,
              })}
            >
              <Ionicons name="chevron-forward" size={22} color="white" />
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
