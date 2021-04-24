!/bin/sh

if [ -n "$1" ]; then
  echo "You supplied the first parameter!"
  n1=$1
else
  echo "First parameter not supplied."
  n1='Nothing'
fi
echo 'N1 = ------'
echo $n1

git add .
git commit -m  $n1
git push
