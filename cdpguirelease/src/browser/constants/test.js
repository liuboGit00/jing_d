export const agents={
    "items": [
        {
            "id": 1,
            "name": "win1",
            "url": "http://192.168.40.23:8000/api/agents/1",
            "ostype": "windows",
            "agentgroup_set": [],
            "connect_set": [
                "http://192.168.40.23:8000/api/connects/2",
                "http://192.168.40.23:8000/api/connects/3"
            ],
            "initiator_set": [
                "http://192.168.40.23:8000/api/initiators/1"
            ],
            "ip":"123",
            "port":"192.168.1.1",
            "initiator":"aaa"
        },
        {
            "id": 2,
            "name": "win2",
            "url": "http://192.168.40.23:8000/api/agents/1",
            "ostype": "windows",
            "agentgroup_set": [],
            "connect_set": [
                "http://192.168.40.23:8000/api/connects/2",
                "http://192.168.40.23:8000/api/connects/3"
            ],
            "initiator_set": [
                "http://192.168.40.23:8000/api/initiators/1"
            ],
            "ip": "321",
            "port": "192.168.1.2",
            "initiator": "bbb"
        }
    ]

}

export const volumes={
     "items":[
        {
            "url": "http://192.168.40.23:8000/api/volumes/1",
            "id": 1,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_0_0",
            "uuid": "7f7072d0-4379-4202-94b1-1b55f41c9e0e",
            "createdate": "2016-03-22T09:07:08.820431Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/1/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/1/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/1/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 30720
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sda",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/29",
            "id": 29,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_1_0",
            "uuid": "8799313b-4121-4ba1-bd7d-9c108134bec6",
            "createdate": "2016-03-29T08:41:31.254711Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/29/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/29/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/29/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 8192
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sdb",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/45"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/30",
            "id": 30,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_2_0",
            "uuid": "cbc3b496-1649-4638-b64e-e1dcc440cfc2",
            "createdate": "2016-03-29T08:41:31.318152Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/30/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/30/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/30/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 8192
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sdc",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/45"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/31",
            "id": 31,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_3_0",
            "uuid": "87dd89f0-64e3-4b8b-a493-2def4c385d53",
            "createdate": "2016-03-29T08:41:31.373190Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/31/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/31/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/31/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 8192
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sdd",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/45"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/45",
            "id": 45,
            "name": "test",
            "uuid": "c35k9k3-2312-233d-83432",
            "createdate": null,
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/45/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/45/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/45/snapshots",
            "snapshot": null,
            "usage": {
                "usable": 23334.875,
                "used": 0.0,
                "usable_text": "22.79GB",
                "used_text": "0.00B",
                "used_pcnt": 0.0,
                "free": 23334.875,
                "size_text": "23.11GB",
                "steal_text": "325.12MB",
                "free_text": "22.78GB",
                "steal": 325.125,
                "size": 23660.0
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": true,
                "fscritical": 85,
                "is_volumepool": true,
                "is_blockvolume": false,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/media/test",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/26",
                    "app_label": "zfs",
                    "model": "zfs"
                },
                "fswarning": 75
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/50",
            "id": 50,
            "name": "testvol",
            "uuid": "80f002a8-a593-4013-95cc-b2377ec6202d",
            "createdate": "2016-04-01T05:20:19.564863Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/50/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/50/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/50/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": "unknown",
                "bd_megs": "unknown"
            },
            "status": {
                "status": "",
                "text": "The status is unknown.",
                "flags": {
                    "unknown": "The status cannot be checked and is therefore unknown."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/zvol/test/testvol",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/51",
            "id": 51,
            "name": "testvol1",
            "uuid": "a27896da-8b80-47b1-a96c-75da2cd38332",
            "createdate": "2016-04-01T05:35:39.686538Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/51/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/51/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/51/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": "103M",
                "bd_megs": "100M"
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": true,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/zvol/test/testvol1",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/74"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/52",
            "id": 52,
            "name": "testvol2",
            "uuid": "31df7efe-9565-4849-865e-b488326888a4",
            "createdate": "2016-04-01T05:43:08.985972Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/52/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/52/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/52/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": "103M",
                "bd_megs": "100M"
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": true,
                "owner": null,
                "path": "/dev/zvol/test/testvol2",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/74"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/53",
            "id": 53,
            "name": "testvol3",
            "uuid": "20c8af68-3538-4b5b-9fd2-feaa7cdc5cf7",
            "createdate": "2016-04-01T05:44:52.838283Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/53/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/53/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/53/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": "103M",
                "bd_megs": "100M"
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/zvol/test/testvol3",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/61",
            "id": 61,
            "name": "testclone",
            "uuid": "c364ae7c-2154-4a1d-8675-99f39de4a166",
            "createdate": "2016-04-05T10:56:11.764657Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/61/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/61/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/61/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": "2.40M",
                "bd_megs": "100M"
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/zvol/test/testclone",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/74",
            "id": 74,
            "name": "logdev",
            "uuid": "f4009c8c-3a94-4967-850e-600041a2b240",
            "createdate": "2016-06-06T10:01:16.492406Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/74/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/74/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/74/snapshots",
            "snapshot": null,
            "usage": {
                "size_text": "100.00MB",
                "size": 100
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": true,
                "logdev": {
                    "url": "http://192.168.40.23:8000/api/logdev/41",
                    "id": 41,
                    "sourcevolume": "http://192.168.40.23:8000/api/volumes/51",
                    "logvolume": "http://192.168.40.23:8000/api/volumes/52",
                    "volume": "http://192.168.40.23:8000/api/volumes/74",
                    "usage": {
                        "entrys": "4134324",
                        "logdirs": "97",
                        "logdriver": "log-writes",
                        "logmode": "immediat",
                        "lastdir": "100",
                        "logcapcity": "204800",
                        "firstdir": "4"
                    }
                },
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/mapper/logdev",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/34",
                    "app_label": "logdev",
                    "model": "logdevice"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/77",
            "id": 77,
            "name": "testsnap",
            "uuid": "225b22ec-e351-43ab-8e60-318c1c057bf4",
            "createdate": "2016-06-17T07:50:34.720381Z",
            "source_pool": "http://192.168.40.23:8000/api/pools/45",
            "storage": "http://192.168.40.23:8000/api/volumes/77/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/77/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/77/snapshots",
            "snapshot": "http://192.168.40.23:8000/api/volumes/52",
            "usage": {
                "bd_used": "10.7K",
                "bd_megs": "100M"
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": true,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/zvol/test/testvol2@testsnap",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/27",
                    "app_label": "zfs",
                    "model": "zvol"
                },
                "fswarning": null
            },
            "upper": null
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/78",
            "id": 78,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_4_0",
            "uuid": "4e8d487f-601d-4364-9c01-ca739858cfac",
            "createdate": "2016-06-20T10:52:15.714185Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/78/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/78/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/78/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 8192
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sde",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": "http://192.168.40.23:8000/api/volumes/45"
        },
        {
            "url": "http://192.168.40.23:8000/api/volumes/79",
            "id": 79,
            "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_5_0",
            "uuid": "a3dad78f-5c8d-4341-8b22-78d2bf643e49",
            "createdate": "2016-06-20T10:52:15.743772Z",
            "source_pool": null,
            "storage": "http://192.168.40.23:8000/api/volumes/79/storage",
            "logdetail": "http://192.168.40.23:8000/api/volumes/79/logdetail",
            "snapshots": "http://192.168.40.23:8000/api/volumes/79/snapshots",
            "snapshot": null,
            "usage": {
                "bd_used": null,
                "bd_megs": 8192
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "is_protected": false,
            "native": {
                "is_loged": false,
                "is_logdev": false,
                "is_filesystemvolume": false,
                "fscritical": null,
                "is_volumepool": false,
                "is_blockvolume": true,
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "is_snapshot": false,
                "is_logfor": false,
                "owner": null,
                "path": "/dev/sdf",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/23",
                    "app_label": "volumes",
                    "model": "genericdisk"
                },
                "fswarning": null
            },
            "upper": null
        }
    ]
 }
 export const disks = {
                "items": [
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_0_0",
                        "url": "http://127.0.0.1:8000/api/disks/1",
                        "id": 1,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "30.00GB",
                            "size": 30720
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/1",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_0_0"
                        }
                    },
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_1_0",
                        "url": "http://127.0.0.1:8000/api/disks/29",
                        "id": 29,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "8.00GB",
                            "size": 8192
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/29",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_1_0"
                        }
                    },
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_2_0",
                        "url": "http://127.0.0.1:8000/api/disks/30",
                        "id": 30,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "8.00GB",
                            "size": 8192
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/30",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_2_0"
                        }
                    },
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_3_0",
                        "url": "http://127.0.0.1:8000/api/disks/31",
                        "id": 31,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "8.00GB",
                            "size": 8192
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/31",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_3_0"
                        }
                    },
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_4_0",
                        "url": "http://127.0.0.1:8000/api/disks/78",
                        "id": 78,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "8.00GB",
                            "size": 8192
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/78",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_4_0"
                        }
                    },
                    {
                        "name": "Virtual_disk pci-0000_00_10_0-scsi-0_0_5_0",
                        "url": "http://127.0.0.1:8000/api/disks/79",
                        "id": 79,
                        "status": {
                            "status": "good",
                            "text": "Everything seems to be in order",
                            "flags": {
                                "online": "The volume is accessible."
                            }
                        },
                        "size": {
                            "size_text": "8.00GB",
                            "size": 8192
                        },
                        "volume": "http://127.0.0.1:8000/api/volumes/79",
                        "native": {
                            "host": "http://127.0.0.1:8000/api/hosts/1",
                            "rpm": 0,
                            "model": "Virtual_disk",
                            "type": "SATA",
                            "serial": "pci-0000_00_10_0-scsi-0_0_5_0"
                        }
                    }
                ]
            }
        
        
export const pools = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "url": "http://192.168.40.23:8000/api/pools/45",
            "id": 45,
            "name": "test",
            "uuid": "c35k9k3-2312-233d-83432",
            "createdate": null,
            "source_pool": null,
            "volumes": "http://192.168.40.23:8000/api/pools/45/volumes",
            "storage": "http://192.168.40.23:8000/api/pools/45/storage",
            "filesystems": "http://192.168.40.23:8000/api/pools/45/filesystems",
            "usage": {
                "max_new_fsv": 23686,
                "max_new_bv_text": "22.60GB",
                "usable": 23686.4,
                "used": 544,
                "usable_text": "23.13GB",
                "used_text": "544.00MB",
                "max_new_bv": 23142.4,
                "used_pcnt": 2.296676573898946,
                "free": 23142.4,
                "size_text": "23.13GB",
                "steal_text": "0.00B",
                "free_text": "22.60GB",
                "max_new_fsv_text": "23.13GB",
                "steal": 0,
                "size": 23686.4
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "native": {
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/24",
                    "app_label": "zfs",
                    "model": "zpool"
                }
            }
        },
        {
            "url": "http://192.168.40.23:8000/api/pools/183",
            "id": 183,
            "name": "pools1111",
            "uuid": "ddf67a47-5f2a-47a9-889a-14825afd0da5",
            "createdate": "2016-08-29T07:23:59.632612Z",
            "source_pool": null,
            "volumes": "http://192.168.40.23:8000/api/pools/183/volumes",
            "storage": "http://192.168.40.23:8000/api/pools/183/storage",
            "filesystems": "http://192.168.40.23:8000/api/pools/183/filesystems",
            "usage": {
                "max_new_fsv": 0,
                "max_new_bv_text": "7.69GB",
                "usable": 7874.79828125,
                "used": 0.23828125,
                "usable_text": "7.69GB",
                "used_text": "0.24B",
                "max_new_bv": 7874.56,
                "used_pcnt": 0.00302587115872353,
                "free": 7874.56,
                "size_text": "7.69GB",
                "steal_text": "0.00B",
                "free_text": "7.69GB",
                "max_new_fsv_text": "0.00B",
                "steal": 0,
                "size": 7874.79828125
            },
            "status": {
                "status": "good",
                "text": "Everything seems to be in order",
                "flags": {
                    "online": "The volume is accessible."
                }
            },
            "native": {
                "host": "http://192.168.40.23:8000/api/hosts/1",
                "type": {
                    "url": "http://192.168.40.23:8000/api/contenttypes/24",
                    "app_label": "zfs",
                    "model": "zpool"
                }
            }
        }
    ]
}



export const pool183 = {
    "url": "http://192.168.40.23:8000/api/pools/183",
    "id": 183,
    "name": "pool183",
    "uuid": "ddf67a47-5f2a-47a9-889a-14825afd0da5",
    "createdate": "2016-08-29T07:23:59.632612Z",
    "source_pool": null,
    "volumes": "http://192.168.40.23:8000/api/pools/183/volumes",
    "storage": "http://192.168.40.23:8000/api/pools/183/storage",
    "filesystems": "http://192.168.40.23:8000/api/pools/183/filesystems",
    "usage": {
        "max_new_fsv": 0,
        "max_new_bv_text": "7.69GB",
        "usable": 7874.79828125,
        "used": 0.23828125,
        "usable_text": "7.69GB",
        "used_text": "0.24B",
        "max_new_bv": 7874.56,
        "used_pcnt": 0.00302587115872353,
        "free": 7874.56,
        "size_text": "7.69GB",
        "steal_text": "0.00B",
        "free_text": "7.69GB",
        "max_new_fsv_text": "0.00B",
        "steal": 0,
        "size": 7874.79828125
    },
    "status": {
        "status": "good",
        "text": "Everything seems to be in order",
        "flags": {
            "online": "The volume is accessible."
        }
    },
    "native": {
        "host": "http://192.168.40.23:8000/api/hosts/1",
        "type": {
            "url": "http://192.168.40.23:8000/api/contenttypes/24",
            "app_label": "zfs",
            "model": "zpool"
        }
    }
}

export const pool45 = {
    "url": "http://192.168.40.23:8000/api/pools/183",
    "id": 45,
    "name": "pool45",
    "uuid": "ddf67a47-5f2a-47a9-889a-14825afd0da5",
    "createdate": "2016-08-29T07:23:59.632612Z",
    "source_pool": null,
    "volumes": "http://192.168.40.23:8000/api/pools/183/volumes",
    "storage": "http://192.168.40.23:8000/api/pools/183/storage",
    "filesystems": "http://192.168.40.23:8000/api/pools/183/filesystems",
    "usage": {
        "max_new_fsv": 0,
        "max_new_bv_text": "7.69GB",
        "usable": 7874.79828125,
        "used": 0.23828125,
        "usable_text": "7.69GB",
        "used_text": "0.24B",
        "max_new_bv": 7874.56,
        "used_pcnt": 0.00302587115872353,
        "free": 7874.56,
        "size_text": "7.69GB",
        "steal_text": "0.00B",
        "free_text": "7.69GB",
        "max_new_fsv_text": "0.00B",
        "steal": 0,
        "size": 7874.79828125
    },
    "status": {
        "status": "good",
        "text": "Everything seems to be in order",
        "flags": {
            "online": "The volume is accessible."
        }
    },
    "native": {
        "host": "http://192.168.40.23:8000/api/hosts/1",
        "type": {
            "url": "http://192.168.40.23:8000/api/contenttypes/24",
            "app_label": "zfs",
            "model": "zpool"
        }
    }
}


export const poolvolumes = [
    {
        "url": "http://192.168.40.23:8000/api/volumes/51",
        "id": 51,
        "name": "testvol1",
        "uuid": "a27896da-8b80-47b1-a96c-75da2cd38332",
        "createdate": "2016-04-01T05:35:39.686538Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/51/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/51/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/51/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "103M",
            "bd_megs": "100M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": true,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": null,
            "path": "/dev/zvol/test/testvol1",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": "http://192.168.40.23:8000/api/volumes/74"
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/52",
        "id": 52,
        "name": "testvol2",
        "uuid": "31df7efe-9565-4849-865e-b488326888a4",
        "createdate": "2016-04-01T05:43:08.985972Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/52/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/52/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/52/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "103M",
            "bd_megs": "100M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": true,
            "owner": null,
            "path": "/dev/zvol/test/testvol2",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": "http://192.168.40.23:8000/api/volumes/74"
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/53",
        "id": 53,
        "name": "testvol3",
        "uuid": "20c8af68-3538-4b5b-9fd2-feaa7cdc5cf7",
        "createdate": "2016-04-01T05:44:52.838283Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/53/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/53/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/53/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "103M",
            "bd_megs": "100M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": null,
            "path": "/dev/zvol/test/testvol3",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": null
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/61",
        "id": 61,
        "name": "testclone",
        "uuid": "c364ae7c-2154-4a1d-8675-99f39de4a166",
        "createdate": "2016-04-05T10:56:11.764657Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/61/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/61/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/61/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "2.40M",
            "bd_megs": "100M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": null,
            "path": "/dev/zvol/test/testclone",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": null
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/105",
        "id": 105,
        "name": "testfs",
        "uuid": "47fcf997-3229-4d11-9f13-ad30f2f10016",
        "createdate": "2016-08-22T11:07:27.768620Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/105/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/105/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/105/snapshots",
        "snapshot": null,
        "usage": {
            "usable": 100,
            "used": 0.125,
            "usable_text": "100.00MB",
            "used_text": "0.12B",
            "used_pcnt": 0.125,
            "free": 99.875,
            "size_text": "100.00MB",
            "steal_text": "0.00B",
            "free_text": "99.87MB",
            "steal": 0,
            "size": 100
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": true,
            "fscritical": 85,
            "is_volumepool": false,
            "is_blockvolume": false,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": "http://192.168.40.23:8000/api/users/1",
            "path": "/media/test/testfs",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/26",
                "app_label": "zfs",
                "model": "zfs"
            },
            "fswarning": 75
        },
        "upper": null
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/106",
        "id": 106,
        "name": "sdfads",
        "uuid": "f522fd72-6a9c-4374-9f16-8b058a7a00e2",
        "createdate": "2016-08-22T11:14:21.689752Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/106/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/106/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/106/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "127M",
            "bd_megs": "123M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": null,
            "path": "/dev/zvol/test/sdfads",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": null
    },
    {
        "url": "http://192.168.40.23:8000/api/volumes/115",
        "id": 115,
        "name": "testvol",
        "uuid": "97f52d55-9002-4c3f-ab91-1dbda63a3b18",
        "createdate": "2016-08-24T07:24:46.027848Z",
        "source_pool": "http://192.168.40.23:8000/api/pools/45",
        "storage": "http://192.168.40.23:8000/api/volumes/115/storage",
        "logdetail": "http://192.168.40.23:8000/api/volumes/115/logdetail",
        "snapshots": "http://192.168.40.23:8000/api/volumes/115/snapshots",
        "snapshot": null,
        "usage": {
            "bd_used": "103M",
            "bd_megs": "100M"
        },
        "status": {
            "status": "good",
            "text": "Everything seems to be in order",
            "flags": {
                "online": "The volume is accessible."
            }
        },
        "is_protected": false,
        "native": {
            "is_loged": false,
            "is_logdev": false,
            "is_filesystemvolume": false,
            "fscritical": null,
            "is_volumepool": false,
            "is_blockvolume": true,
            "host": "http://192.168.40.23:8000/api/hosts/1",
            "is_snapshot": false,
            "is_logfor": false,
            "owner": null,
            "path": "/dev/zvol/test/testvol",
            "type": {
                "url": "http://192.168.40.23:8000/api/contenttypes/27",
                "app_label": "zfs",
                "model": "zvol"
            },
            "fswarning": null
        },
        "upper": null
    }
]


export const users = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "url": "http://192.168.40.23:8000/api/users/1",
            "id": 1,
            "username": "zktx",
            "email": "zktx@heartsone.com",
            "first_name": "wang",
            "last_name": "mingxin",
            "is_active": true,
            "is_staff": true,
            "is_superuser": true,
            "last_login": "2016-07-14T07:24:47.390481Z",
            "date_joined": "2016-03-07T10:40:30.568919Z",
            "token": {
                "token": "97cc2cfb4ede1ddb72a625cababf485913722bc9",
                "createdate": "2016-03-17T07:01:50.765Z"
            }
        },
        {
            "url": "http://192.168.40.23:8000/api/users/2",
            "id": 2,
            "username": "admin",
            "email": "admin@test.com",
            "first_name": "administrator",
            "last_name": "for opencdp",
            "is_active": true,
            "is_staff": true,
            "is_superuser": true,
            "last_login": null,
            "date_joined": "2016-06-15T08:56:51.725026Z",
            "token": {
                "token": "Not set yet!"
            }
        }
    ]
}
