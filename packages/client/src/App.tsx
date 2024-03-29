import { useEffect, useState } from 'react';
import { ButtonTypeEnum } from '@/common/constant';
import { Row, Col, Button } from 'antd';
import CardItem from './components/card-item';
import styles from './app.module.less';
import { isCurrentTimeBeforeOther } from '@/utils';
import { useRequest } from 'ahooks';
import { getList, updateList } from '@/services/app.service';
import type { ItemProps } from '@/services/app.service';

export type ItemType = keyof typeof ButtonTypeEnum;

function App() {
  const [leftList, setLeftList] = useState<ItemProps[]>([]);
  const [rightList, setRightList] = useState<ItemProps[]>([]);

  const { run: getInitialList } = useRequest(
    getList,
    {
      manual: true,
      onSuccess(res) {
        const list = res.data?.list || [];
        setLeftList(list);
      }
    }
  );

  const { run:  runUpdateList, loading } = useRequest(
    updateList,
    {
      manual: true,
      onSuccess() {
        // TODO: 后续动作
      }
    }
  );

  useEffect(() => {
    getInitialList();
  }, []);

  const removeItemById = (id: ItemProps['id'], list: ItemProps[]) => list.filter((item) => item.id !== id);
  const insertItem = (item: ItemProps, list: ItemProps[]) => {
    list.push(item);
    list.sort((a: ItemProps, b: ItemProps) => isCurrentTimeBeforeOther(a.date, b.date));
    return list;
  };

  const transformFromAToB = (item: ItemProps, curList: ItemProps[], otherList: ItemProps[]) => {
    const removedList = removeItemById(item.id, curList);
    const insertedList = insertItem(item, otherList);

    return {
      removedList,
      insertedList
    };
  };

  function onHandle(type: ItemType, item?: ItemProps) {
    switch (type) {
      case ButtonTypeEnum.ADD: {
        const { removedList, insertedList } = transformFromAToB((item as ItemProps), leftList, rightList);
        setLeftList(removedList);
        setRightList(insertedList);
        break;
      }

      case ButtonTypeEnum.MINUS: {
        const { removedList, insertedList } = transformFromAToB((item as ItemProps), rightList, leftList);
        setRightList(removedList);
        setLeftList(insertedList);
        break;
      }

      case ButtonTypeEnum.SUBMIT: {
        runUpdateList(rightList);
        break;
      }

      default:
    }
  }

  return (
    <div className={styles.app}>
      <Row>
        <Col span={12} className={styles.column}>
          {leftList.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              content={item.content}
              date={item.date}
              type={ButtonTypeEnum.ADD}
              callback={() => onHandle(ButtonTypeEnum.ADD, item)}
            />
          ))}
        </Col>
        <Col span={12} className={styles.column}>
          {rightList.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              content={item.content}
              date={item.date}
              type={ButtonTypeEnum.MINUS}
              callback={() => onHandle(ButtonTypeEnum.MINUS, item)}
            />
          ))}
        </Col>
      </Row>
      <Row justify="center" className={styles.submitWrap}>
        <Button type="primary" onClick={() => onHandle(ButtonTypeEnum.SUBMIT)} loading={loading}>提交</Button>
      </Row>
    </div>
  );
}

export default App;
