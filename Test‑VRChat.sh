#!/usr/bin/env bash
# test_vrchat.sh
# --------------------------------------------
# Проверка соединения и портов для VRChat
# --------------------------------------------

SERVERS=(
  "vrchat.com"
  "servers.vrchat.com"
  "185.181.168.10"   # пример
  "18.234.123.45"
)

TCP_PORTS="80,443"
UDP_PORTS="5055,5056,5058"
UDP_RANGE="27000-27100"

TIMEOUT=5

echo "=== TCP проверка ==="
for host in "${SERVERS[@]}"; do
  for port in $(echo $TCP_PORTS | tr ',' ' '); do
    if timeout $TIMEOUT bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null; then
      echo "✔ ${host}:${port} (TCP) – доступен"
    else
      echo "⚠ ${host}:${port} (TCP) – недоступен"
    fi
  done
done

echo -e "\n=== UDP проверка (nmap) ==="
for host in "${SERVERS[@]}"; do
  # Сначала диапазон 27000‑27100
  nmap -n -Pn -p ${UDP_RANGE} -sU -T4 --max-retries 2 --max-scan-delay 200m ${host} 2>/dev/null | grep "open" || echo "⚠ ${host}:${UDP_RANGE} – нет открытых UDP"
  # Затем отдельные порты
  nmap -n -Pn -p ${UDP_PORTS} -sU -T4 --max-retries 2 --max-scan-delay 200m ${host} 2>/dev/null | grep "open" || echo "⚠ ${host}:${UDP_PORTS} – нет открытых UDP"
done
