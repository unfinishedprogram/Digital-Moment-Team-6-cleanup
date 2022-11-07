import React, { useEffect, useRef, useState } from "react"
import styles from "../../styles/drawer.module.scss"

export interface IDrawerProps extends React.PropsWithChildren {
  stateChange: (state: DrawerStates) => void,
}
type DrawerStates = "open" | "closed" | "half";

const touchCords = (event: React.TouchEvent<HTMLDivElement>): [number, number] =>
  [event.changedTouches[0].clientX, event.changedTouches[0].clientY];

const Drawer: React.FunctionComponent<IDrawerProps> = props => {
  const [isOpen, setOpen] = useState<DrawerStates>("closed");
  const [isDragging, setDragging] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState<[number, number] | null>(null);
  const [touchPos, setTouchPos] = useState<[number, number] | null>(null);

  const divRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let delta = 0;
    if (isDragging) {
      delta = -Math.round(touchStartPos![1] - touchPos![1]);
      if (isOpen == "open") {
        delta = Math.max(delta, 0);
      } else if (isOpen == "closed") {
        delta = Math.min(delta, 0);
      }
    }

    divRef.current?.setAttribute("style", `--delta: ${delta}px`);
  })

  const setDrawerState = (state: DrawerStates) => {
    setOpen(state);
    props.stateChange(state);
  }

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = event => {
    if (isOpen == "open" && contentRef.current!.scrollTop != 0) return;

    setDragging(true);
    setTouchStartPos(touchCords(event))
    setTouchPos(touchCords(event))
  }

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = event => {
    if (!isDragging) return;
    let deltaY = touchStartPos![1] - touchPos![1];

    if (deltaY > 5) setDrawerState("open");
    else if (deltaY < -5) setDrawerState("closed");

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
    data-state={isOpen}
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
