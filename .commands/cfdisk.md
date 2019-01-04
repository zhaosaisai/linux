# Linux cfdisk命令

Linux cfdisk命令用于磁盘分区。

cfdisk是用来磁盘分区的程序，它十分类似DOS的fdisk，具有互动式操作界面而非传统fdisk的问答式界面，您可以轻易地利用方向键来操控分区操作。

### 语法

    cfdisk [-avz][-c -h -s ][-P ][外围设备代号]
    

### 参数说明：

- -a   在程序里不用反白代表选取，而以箭头表示。
- -c   忽略BIOS的数值，直接指定磁盘的柱面数目。
- -h   忽略BIOS的数值，直接指定磁盘的磁头数目。
- -P   显示分区表的内容，附加参数"r"会显示整个分区表的详细资料，附加参数"s"会依照磁区的顺序显示相关信息，附加参数"t"则会以磁头，磁区，柱面的方式来显示资料。
- -s   忽略BIOS的数值，直接指定磁盘的磁区数目。
- -v   显示版本信息。
- -z   不读取现有的分区，直接当作没有分区的新磁盘使用。

### 实例

进行磁盘分区：

    # cfsik
    

进行磁盘分区，使用箭头进行操作，而不使用反白表示：

    # cfsik -a
    

进行磁盘分区，使用箭头进行操作，而不使用反白表示：

    # cfsik -s 3
    