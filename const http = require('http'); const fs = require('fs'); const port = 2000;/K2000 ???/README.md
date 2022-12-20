# Net AES DD Benchmark

Note: Script written to determinate if RPI 4 will have good performances with its SSD drive and an encryption layer (LUKS). The network is optimized here but in the real life, wifi will increase the times, SAMBA or others protocols will destroy the perf also ! But that's not the question...

## Prerequise

- Docker
- Ethernet connection
- Iperf3 speed test to check network is good

## Tested $TESTED

```bash
  cd /tmp
  # Copy index.js
  sudo docker run --rm -it -v $(pwd):/test --init --workdir /test -p 2000:2000 node:alpine index.js
  # while finish kill process (CTRL+C)
  rm file.out.txt
```

## Tester

```bash
  cd /tmp
  dd if=/dev/urandom of=test.txt bs=500MB count=1
  date +%s; curl -X POST --data-binary '@test.txt' http://$TESTED:2000 ; curl http://$TESTED:2000 > feedback.txt ; date +%s; md5sum test.txt feedback.txt
  # check md5sum are same
  # You can see download speed with curl
  # You can see total duration with the times
  rm test.txt feedback.txt
```

## My results rpi04 vs laptop

- Network 930 Mbits/sec
- rpi04
  - curl 30-34MB (240-272MB)
  - duration ~30s
  - notes : if we remove AES pipe, we have 45-87MB for curl and 14s for duration. As expected, encryption has strong impact for the NAS.
- laptop
  - curl 96-110MB (768-880MB)
  - duration 10s
  - notes: possibly limited by network

## Conclusion

Raspberry pi 4 : KO especialy with encryption
