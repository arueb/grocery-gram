import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

const SortableItem = sortableElement(({ index, item, imgClick }) =>
    <img
      key={String(item.fileId) + String(index)}
      id={item.fileId}
      src={item instanceof File ? URL.createObjectURL(item) : item.thumbUrl }
      alt={item.fileId}
      //   style={{ height: "50px" }}
      style={{ height: "80px" }}
      onClick={() => imgClick(item)}
    />
);

const SortableContainer = sortableContainer(({ children }) => {
  return <div style={{ display: "inline-block" }}>{children}</div>;
});

class SortableComponent extends Component {
  //  state = {
  //    items: ['1025', '1003', '300', '400', '500', '600'],
  //  };

  render() {

    return (
      <React.Fragment>
        <SortableContainer onSortEnd={this.props.onSortEnd} axis="x" distance={1}>
          {this.props.images.map((value, index) => (
            <SortableItem key={"item-" + String(value.fileId)} index={index} item={value} imgClick={this.props.imgClick} />
          ))}
        </SortableContainer>
      </React.Fragment>
    );
  }
}

export default SortableComponent;