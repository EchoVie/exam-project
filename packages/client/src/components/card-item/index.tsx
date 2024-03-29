import React from 'react';
import { ButtonTypeEnum } from '@/common/constant';
import { transformToDate } from '@/utils';
import { 
  Card,
  Row,
  Typography,
  Button
} from 'antd';
import type { ItemType } from '@/App';
import type { ItemProps } from '@/services/app.service';


interface Props extends Partial<ItemProps>{
  type: ItemType;
  callback: () => void;
}

function CardItem(props: Props) {
  const { 
    title,
    content,
    date,
    type,
    callback,
  } = props;

  const onButtonClick = () => {
    if (callback) {
      callback();
    }
  }

  return (
    <Card>
      <Row justify= "space-between" wrap={false}>
        <Typography.Text ellipsis={{ tooltip: title }}>
          {title}
        </Typography.Text>
        <Button onClick={onButtonClick} type="primary">{ButtonTypeEnum[type!]}</Button>
      </Row>
      <Typography.Paragraph ellipsis={{rows: 5, tooltip: content}}>
        {content}
      </Typography.Paragraph>
      <Row>
        <Typography.Text type="secondary">
          {transformToDate(date!)}
        </Typography.Text>
      </Row>
    </Card>
  )
}

export default CardItem;