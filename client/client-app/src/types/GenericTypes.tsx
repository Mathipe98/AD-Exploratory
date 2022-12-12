interface GenericProps {
  headerToken: string;
}

interface Date {
  year: number;
  month: number;
  day: number;
}

interface Image {
  id: number;
  title: string;
  description: string;
  keywords: Array<string>;
  author: string;
  creator: string;
  captureDate: Date;
  storageDate: Date;
  base64: string;
}

export type { GenericProps, Image };
