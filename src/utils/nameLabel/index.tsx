import React, { useEffect } from "react";
import styles from "./name.module.css";
interface Props {
  title: string;
}

const NameLabel: React.FC<Props> = ({ title }) => {
  return <div className={styles.labelText}>{title}</div>;
};

export default NameLabel;
