import Image from "next/image";

interface ImagePerfilProps {
  imageUrl: String;
}

export default function ImagePerfil({ imageUrl }: ImagePerfilProps) {
  return (
    <>
      {typeof imageUrl === 'string' && (
        <Image width={100} height={150} src={imageUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
      )}
    </>
  );
}