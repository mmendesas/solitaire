import { useGame } from '../context/GameContext';
import { CardComponent } from './Card';
import './SourceBox.css';

export function SourceBox() {
  const {
    config,
    lanes,
    moveCardsBetweenLanes,
    removeItemFromLane,
    resetRemainCards,
  } = useGame();

  const remain = lanes[config.remainID]?.cards || [];
  const current = lanes[config.nextID]?.cards || [];

  const topRemain = remain.slice(-1)[0];
  const topCurrent = current.slice(-1)[0];

  const currentKey = `${topCurrent?.suit?.value}-${topCurrent?.value}`;

  const handleClick = () => {
    const source = topRemain;
    const target = { ...source, flip: true, laneID: config.nextID };

    if (!source) {
      resetRemainCards();
      return;
    }

    moveCardsBetweenLanes({ source, target });
    removeItemFromLane(source.laneID as string, source);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div className="source-box" onClick={handleClick}>
        <div className="border">
          {!topRemain && <div className="reload-icon">⟳</div>}
          {topRemain && <CardComponent data={topRemain} />}
        </div>
      </div>
      <div className="source-box">
        <div className="border">
          {topCurrent && <CardComponent key={currentKey} data={topCurrent} />}
        </div>
      </div>
    </div>
  );
}
