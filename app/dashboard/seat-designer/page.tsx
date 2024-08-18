import PageContainer from '@/components/layout/page-container';
import SeatDesigner from '@/components/seat-designer/seat-designer';

export default function page() {
  return (
    <PageContainer>
      <div className="App">
        <h1>Seat Designer</h1>
        <SeatDesigner />
      </div>
    </PageContainer>
  );
}
