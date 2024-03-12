import { FileSearchOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { decodeHtmlEntities } from "../helpers/formatData";

const useTableSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    setSearchText("");
    confirm();
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters, selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) =>
      filtered ? (
        <FileSearchOutlined style={{ fontSize: 18 }} />
      ) : (
        <SearchOutlined
          style={{
            fontSize: 18,
            color: "green",
          }}
        />
      ),
    onFilter: (value, record) => {
      return record[dataIndex]
        ?.toString()
        ?.toUpperCase()
        ?.includes(value.toUpperCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const renderInputSearch = (dataIndex, isCopyable = false) => ({
    render: (text) => {
      return searchedColumn === dataIndex ? (
        isCopyable ? (
          <Space>
            <Highlighter
              highlightStyle={{
                backgroundColor: "#ffc069",
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={decodeHtmlEntities(text ? text.toString() : "")}
            />
            <Typography.Text
              copyable={{
                text: decodeHtmlEntities(text ? text.toString() : ""),
              }}
            />
          </Space>
        ) : (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={decodeHtmlEntities(text ? text.toString() : "")}
          />
        )
      ) : (
        decodeHtmlEntities(text, isCopyable)
      );
    },
  });
  return { getColumnSearchProps, renderInputSearch };
};

export default useTableSearch;
