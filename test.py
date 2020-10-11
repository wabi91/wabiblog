def max_calc(value, coin):
  res=[]
  for i in coin:
    # 코인금액 만큼 값 나누기
    calc = int(value / i)
    # 한번도 res에 들어가지 않고, 나눈 값이 0 초과일 때
    if len(res) == 0 and calc > 0:
      res = [value - calc*i, i, calc]
      break
  
  # 모든 코인의 값이 나눈값이 0일 경우
  if len(res) == 0:
    # [남은 값 0, 코인 중 가장 낮은 금액코인, 사용 수 1]
    return [0, coin[len(coin)-1], 1]

  # [가장 높은 금액의 코인으로 나눈 값의 나머지, 사용된 코인, 사용된 코인 횟수]
  return res

coin = [100, 50, 10, 1]
# [값, 코인금액, 코인 사용 횟수]
value = [562, 0, 0]
dic = {}

for i in coin:
  dic[i] = 0

while True:
  value = max_calc(value[0], coin)
  # 사용된 코인에 사용된 횟수 더하기
  dic[value[1]] += value[2]
  # 남은 금액이 0 이하일 경우 loop 멈춤
  if value[0] <= 0:
    break

print(dic)
# {1: 12, 50: 1, 100: 3}