import yaml


def update_yaml_with_json(yaml_path, json_data):
    # 读取原始的YAML配置文件
    with open(yaml_path, "r") as yaml_file:
        yaml_content = yaml.safe_load(yaml_file)

    # 更新YAML配置
    update_yaml_recursively(yaml_content, json_data)

    # 将更新后的YAML写回文件
    with open(yaml_path, "w") as yaml_file:
        yaml.dump(yaml_content, yaml_file, default_flow_style=False)


def add_camera_to_yaml(yaml_path, camera_data):
    # 读取原始的YAML配置文件
    with open(yaml_path, "r") as yaml_file:
        yaml_content = yaml.safe_load(yaml_file)

    # 添加新相机配置
    update_yaml_recursively(yaml_content["cameras"], camera_data)

    # 将更新后的YAML写回文件
    with open(yaml_path, "w") as yaml_file:
        yaml.dump(yaml_content, yaml_file, default_flow_style=False)


def delete_camera_from_yaml(yaml_path, camera_key):
    # 读取原始的YAML配置文件
    with open(yaml_path, "r") as yaml_file:
        yaml_content = yaml.safe_load(yaml_file)

    # 删除相机配置
    if "cameras" in yaml_content and camera_key in yaml_content["cameras"]:
        del yaml_content["cameras"][camera_key]

    # 将更新后的YAML写回文件
    with open(yaml_path, "w") as yaml_file:
        yaml.dump(yaml_content, yaml_file, default_flow_style=False)


def update_yaml_recursively(yaml_data, json_data):
    if isinstance(yaml_data, dict) and isinstance(json_data, dict):
        for key, value in json_data.items():
            if key in yaml_data:
                if isinstance(value, (dict, list)):
                    update_yaml_recursively(yaml_data[key], value)
                else:
                    yaml_data[key] = value
            else:
                # Add new key-value pairs to the YAML if the key is not present
                yaml_data[key] = value
    elif isinstance(yaml_data, list) and isinstance(json_data, list):
        for i in range(len(yaml_data), len(json_data)):
            yaml_data.append(json_data[i])
        for i in range(min(len(yaml_data), len(json_data))):
            if isinstance(json_data[i], (dict, list)):
                update_yaml_recursively(yaml_data[i], json_data[i])
            else:
                yaml_data[i] = json_data[i]


# yaml_path = 'config.yaml'

# 示例JSON数据，包含要新增的相机信息
# add_camera_json = '''
# {
#     "newcam": {
#         "ffmpeg": {
#         "inputs": [
#             {"path": "rtsp://example.com/stream", "roles": ["detect", "rtmp", "record"]}
#         ]
#         },
#         "mqtt": {"bounding_box": false, "crop": true, "enabled": true, "height": 500, "quality": 100, "timestamp": false}
#     }
# }
# '''
# 调用新增相机函数
# add_camera_data = json.loads(add_camera_json)
# add_camera_to_yaml(yaml_path, add_camera_data)


# 示例要删除的相机的key
# delete_camera_key = 'testcam'
# 调用删除相机函数
# delete_camera_from_yaml(yaml_path, delete_camera_key)


# 假设你有一个前端传递的JSON数据
# frontend_json = '''
# {
#     "cameras": {
#         "testcam": {
#             "ffmpeg": {
#             "inputs": [
#                 {"path": "123", "roles": ["qwe", "asd", "zxc"]}
#             ]
#             },
#             "mqtt": {"bounding_box": false, "crop": true, "enabled": true, "height": 5000, "quality": 1000, "timestamp": false}
#         }
#     }
# }
# '''
# json_data = json.loads(frontend_json)
# 调用函数更新YAML配置
# update_yaml_with_json(yaml_path, json_data)
