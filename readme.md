—watch：指定监听文件 不支持unix glob（✅）
允许在文件中使用nodemon.json或者在package.json中使用nodemonConfig字段指定配置项（✅）
优先级为：—congfig > nodemon.json > nodemonConfig
—ignore：指定不监视的文件 支持unix glob（✅）
—delay：重新启动前要延迟的时间（✅）
rs —— 手动刷新（✅）