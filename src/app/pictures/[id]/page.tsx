import Picture from 'components/Picture';

export default function PicturePage({ params }: { params: { id: string } }) {
    return <Picture id={params.id} standalone />;
}
