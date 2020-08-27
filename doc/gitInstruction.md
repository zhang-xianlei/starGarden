# INSTRUCTION OF GIT

## git remote -v

查看远程库地址

## git branch -a

查看所有分支

## git checkout -b branchName origin/branchName

拉取远程分支到本地

## git push origin branchName

分支推到远程分支

## git branch -d branchName

删除分支

## git push origin -d branchName

删除远程分支

## git tag -a v0.01 -m "version 0.01"

打标签

## git branch -m new-branchName

重命名当前分支

## git push origin -u new-branchName

重命名远程库

## git branch -m old-branchName new-branchName

## git push origin :old-branchName new-branchName

重命名非当前分支以及非当前远程库

## git reset --hard/soft/mixed

--hard 会清空工作目录和暂存区的改动 --soft则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区 --mixed（默认值）则会保留工作目录并清空暂存区
