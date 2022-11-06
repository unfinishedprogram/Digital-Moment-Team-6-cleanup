import React, { useEffect, useRef, useState } from "react"
import styles from "../../styles/drawer.module.scss"

export interface IDrawerProps extends React.PropsWithChildren {

}

const touchCords = (event: React.TouchEvent<HTMLDivElement>): [number, number] =>
  [event.changedTouches[0].clientX, event.changedTouches[0].clientY];

const Drawer: React.FunctionComponent<IDrawerProps> = props => {
  const [isOpen, setOpen] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState<[number, number] | null>(null);
  const [touchPos, setTouchPos] = useState<[number, number] | null>(null);

  const divRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let delta = 0;
    if (isDragging) {
      delta = -Math.round(touchStartPos![1] - touchPos![1]);
      if (isOpen) {
        delta = Math.max(delta, 0);
      }
    }

    divRef.current?.setAttribute("style", `--delta: ${delta}px`);
  })

  const open = () => {
    setOpen(true);
  }

  const close = () => {
    setOpen(false);
  }

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = event => {
    if (isOpen && contentRef.current!.scrollTop != 0) return;

    setDragging(true);
    setTouchStartPos(touchCords(event))
    setTouchPos(touchCords(event))
  }

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = event => {
    if (!isDragging) return;
    let deltaY = touchStartPos![1] - touchPos![1];

    if (deltaY > 5) open();
    else if (deltaY < -5) close();

    setDragging(false);
    setTouchStartPos(null);
    setTouchPos(null);
  }

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = event => {
    if (isDragging) {
      setTouchPos(touchCords(event))
    }
  }

  return <div
    ref={divRef}
    data-open={isOpen}
    data-dragging={isDragging}
    className={styles.drawer}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
  >
    <div ref={contentRef} className={styles.content}>
      {props.children}
    </div>
  </div >
}

export default Drawer;