#!/usr/bin/env python
#
#  sim.py - simulate data going into MQTT
#  only for testing web UI
#
#  NOTE:   $ pip install paho-mqtt
#
import time, gzip
import paho.mqtt.client as mqtt

zfname = 'dat1.json.gz'  # real data, sampled at 2 Hz
#zfname = 'dat2.json.gz' # large data, sampled around 5 hz

delay = 0.5 # realtime - real scale data is sampled at 2 Hz
delay = 2.0 # slow playback - only for testing

mqtt_host = 'localhost' # for real setup, using local mosquitto
#mqtt_host = 'iot.eclipse.org' # for testing

debug = False
debug = True # turn on to echo data to console

# -----------------------------------------

f = None

# connect to MQTT
mq = mqtt.Client()
#mq.connect("localhost", 1883,60)

print "connect to MQTT broker: ", mqtt_host
try:
    mq.connect(mqtt_host,1883,60)
except Exception, e:
    raise ValueError("problem connecting to "+mqtt_host)

#mq.subscribe("mytopic", 0)
#mq.publish("scale/records", "start records")
#mq.publish("hello/world", "my message")
#mq.loop_start()

# read sampled data file and send to MQTT
#f = open(fname)
f = gzip.open(zfname)
for dat in f:
    if debug: print dat # XXX echo data to console
    mq.publish("scale/records", dat)
    time.sleep(delay)

print "Shutdown: "
f.close()
mq.loop_stop()
mq.disconnect()

print "*** DONE ***"





