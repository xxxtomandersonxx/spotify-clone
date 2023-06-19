'use client';

import { useLoadImage } from "@/hooks/useLoadimage";
import { Song } from "@/types";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
};

export const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
}) => {
  const imagePath = useLoadImage(data);


  return (
    <div>
      Song Item
    </div>
  )
}
